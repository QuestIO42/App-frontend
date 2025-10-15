import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllQuizes, fetchUserQuizProgress } from '@/services/api/quiz';
import { fetchCourse, exportCourseGrades } from '@/services/api/course';
import { Quiz } from '@/interfaces/Quiz';
import { Course as CourseData } from '@/interfaces/Course';
import { useAuth } from '@/hooks/useAuth';
import { fetchUserRoleInCourse } from '@/services/api/user';
import { fetchRankingData, RankingUser } from '@/services/api/ranking';
import { Post } from '@/interfaces/Post';
import { fetchPostsByCourse } from '@/services/api/post';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Ranking from '@/components/home/Ranking';
import ProgressXpBar from '@/components/utility/ProgressXpBar';
import Voltar from '@/components/course/Voltar';
import Button from '@/components/utility/Button';
import CircuitCourse from '@/components/svgComponents/circuit/CircuitCourse';
import ExercisesGroup from '@/components/course/ExercisesGroup';
import RankingItem from '@/components/home/RankingItem';
import PostThreadCourse from '@/components/course/PostThreadCourse';
import NewPostForm from '@/components/course/NewPostForm';
import ReplyForm from '@/components/course/ReplyForm';

export default function Course() {
  const [Quizes, setQuizes] = useState<Quiz[]>([]);
  const [Course, setCourse] = useState<CourseData | null>(null);
  const [userCourseRole, setUserCourseRole] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [replyingToPostId, setReplyingToPostId] = useState<string | null>(null);
  const [isCourseLoading, setIsCourseLoading] = useState(true);
  const { courseId } = useParams();
  const { user, isLoading: isAuthLoading } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const [rankingUsers, setRankingUsers] = useState<RankingUser[]>([]);
  const [isRankingLoading, setIsRankingLoading] = useState<boolean>(true);

  const topLevelPosts = posts.filter(p => p.id_parent === null);
  const replies = posts.filter(p => p.id_parent !== null);
  const getRepliesForPost = (postId: string) => {
    return replies.filter(reply => reply.id_parent === postId);
  };

  const [quizProgress, setQuizProgress] = useState({
    userScore: 0,
    maxScore: 0,
    percentage: 0,
  });

  useEffect(() => {
    async function fetchData() {
      if (courseId && user?.id) {
        try {
          const [quizesResponse, courseInfoResponse, userCourseData] = await Promise.all([
            fetchAllQuizes(courseId),
            fetchCourse(courseId),
            fetchUserRoleInCourse(user.id.toString(), courseId)
          ]);

          setQuizes(quizesResponse);
          setCourse(courseInfoResponse.data);
          setUserCourseRole(userCourseData.role);

          if (quizesResponse.length > 0) {
            const progressPromises = quizesResponse.map((quiz: { id: string; }) =>
              fetchUserQuizProgress(quiz.id, user.id.toString())
            );
            const progresses = await Promise.all(progressPromises);

            let totalUserScore = 0;
            let totalQuizMaxScore = 0;

            progresses.forEach(p => {
              totalUserScore += p.user_max_score || 0;
              totalQuizMaxScore += p.quiz_max_score || 0;
            });

            const percentage = totalQuizMaxScore > 0
              ? (totalUserScore / totalQuizMaxScore) * 100
              : 0;

            setQuizProgress({
              userScore: totalUserScore,
              maxScore: totalQuizMaxScore,
              percentage: percentage,
            });
          }

          const fetchedPosts = await fetchPostsByCourse(courseId);
          setPosts(fetchedPosts);
        } catch (error) {
          console.error("Failed to fetch course data:", error);
          setUserCourseRole(null);
        } finally {
          setIsCourseLoading(false);
          setIsLoadingPosts(false);
        }
      } else if (!isAuthLoading) {
        setIsCourseLoading(false);
        setIsLoadingPosts(false);
      }
    }

    const loadRanking = async () => {
      setIsRankingLoading(true);
      const users = await fetchRankingData(10);

      const filteredUsers = users.filter(user => user.total_xp > 0);

      setRankingUsers(filteredUsers);
      setIsRankingLoading(false);
    };

        loadRanking();
    fetchData();
  }, [courseId, user, isAuthLoading]);

  const handleOpenNewPostModal = () => {
      setIsNewPostModalOpen(true);
    };

    const handleCloseNewPostModal = () => {
      setIsNewPostModalOpen(false);
    };

    const handleOpenReplyModal = (postId: string) => {
      setReplyingToPostId(postId);
    };

    const handleCloseReplyModal = () => {
      setReplyingToPostId(null);
    };

    const handlePostCreated = (newPost: Post) => {
      // Adiciona o novo post no topo da lista para feedback imediato
      setPosts(prevPosts => [newPost, ...prevPosts]);
      // A lógica de agrupamento será executada automaticamente na próxima renderização
    };

  const isUserTheCourseTeacher = userCourseRole === 2;

  if (isCourseLoading || isAuthLoading) {
    // Show a loading spinner or placeholder while fetching
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const handleImportSuccess = (res: any) => {
    alert('Usuários importados com sucesso!');
    console.log(res.data);
  };

  const handleImportError = (err: any) => {
    alert('Falha ao importar.');
    console.error(err);
  };

  const handleExportGrades = async () => {
    if (!courseId || isExporting) return;

    setIsExporting(true);

    try {
      const response = await exportCourseGrades(courseId);
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : 'notas_do_curso.csv';

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);

      link.click();

      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      window.URL.revokeObjectURL(url);

    } catch (error) {
      alert('Falha ao exportar as notas. Verifique se você tem permissão e tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full overflow-x-hidden gap-6 bg-grid-pattern">
      <Header/>

      {isNewPostModalOpen && (
        <NewPostForm
          courseId={courseId!}
          onClose={handleCloseNewPostModal}
          onPostCreated={handlePostCreated}
        />
      )}

      {replyingToPostId && (
        <ReplyForm
          courseId={courseId!}
          parentId={replyingToPostId}
          onClose={handleCloseReplyModal}
          onReplyCreated={handlePostCreated}
        />
      )}

      <div className="flex flex-col mt-12 justify-between items-center w-full">
        <div className="relative w-full flex flex-col justify-end gap-6">
          <div className="ml-10 md:ml-20">
            <Voltar/>
          </div>

          <div className="absolute -bottom-44 left-0 w-full">
            <CircuitCourse />
          </div>
        </div>

        {Course && (
          <div className="flex flex-col justify-center mx-10">
            <h2 className="mb-8 mt-10 text-5xl text-center font-bold text-cinza-900">
              {Course.name}
            </h2>

            <ProgressXpBar
              text="seu progresso"
              progress={quizProgress.percentage}
              value={quizProgress.userScore}
              maxValue={quizProgress.maxScore}
            />
          </div>
        )}

        <div className="w-[25%] my-12 flex justify-end">
          {isUserTheCourseTeacher && (
            <>
              <Button
                upload
                uploadUrl="/user"
                fieldName="file"
                courseId={courseId!}
                onUploadSuccess={handleImportSuccess}
                onUploadError={handleImportError}
                variant='secondary'
                className="mr-10 bg-white text-xl"
                text="importar alunos"
                size="small"
              ></Button>
              <Button
                onClick={handleExportGrades}
                disabled={isExporting}
                courseId={courseId!}
                variant='quaternary'
                className="mr-[90px] text-cinza-900 bg-white text-xl"
                text={isExporting ? "Exportando..." : "exportar notas"}
                size="small"
              ></Button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-12 ml-10 md:ml-20 mt-4 mb-12">
        <div className="flex flex-col flex-1 min-w-[60%]">
          {/* Seção de Questionários */}
          <div className="flex flex-col w-full mb-8">
            <div className="flex w-fit py-4 px-8 items-center justify-start bg-roxo-300 shadow-default-roxo-500 mb-6">
              <p className="text-center text-2xl font-bold text-[#bab1fc]">
                Questionários
              </p>
            </div>
            <ExercisesGroup itens={Quizes} />
          </div>

          {/* Seção do Fórum/Posts */}
          <div className="flex flex-col w-full pr-12">
            <div className="flex justify-between items-center w-full p-6 bg-laranja shadow-default-laranja">
              <h2 className="text-2xl font-bold text-[#97581F]">Fórum de Discussão</h2>
              <Button variant='tertiary' text="Novo Post" size="medium" onClick={handleOpenNewPostModal} />
            </div>

            <div className="p-4 bg-gray-100 shadow-default-cinza-300">
              {isLoadingPosts ? (
                <p className="text-center text-cinza-900 py-4">Carregando posts...</p>
              ) : topLevelPosts.length > 0 ? (
                topLevelPosts.map(post => (
                  <PostThreadCourse
                    key={post.id}
                    post={post}
                    replies={getRepliesForPost(post.id)}
                    onReply={handleOpenReplyModal}
                  />
                ))
              ) : (
                <p className="text-center text-cinza-900 py-4">Ainda não há nenhuma discussão no fórum.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mr-4 flex flex-col">
          <Ranking>
            {isRankingLoading ? (
              <p>Carregando ranking...</p>
            ) : (
              <RankingItem users={rankingUsers} />
            )}
          </Ranking>
        </div>
      </div>

      <Footer />
    </div>
  );
}
