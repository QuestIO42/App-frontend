import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import CoursesTemplate from '@/components/home/CoursesTemplate';
import Ranking from '@/components/home/Ranking';
import UserProgression from '@/components/home/UserProgression';
import CircuitHome from '@/components/svgComponents/circuit/CircuitHome';
import CircuitTopRight from '@/components/svgComponents/circuit/CircuitTopRight';
import CourseIcon from '@/components/svgComponents/icons/CourseIcon';
import LabIcon from '@/components/svgComponents/icons/LabIcon';
import RankingItem from '@/components/home/RankingItem';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { mockVirtualLabs } from '@/utils/mocks/mockVirtualLabs';
import { fetchAllCourses, fetchAllUserCourses } from '@/services/api/course';
import { Course } from '@/interfaces/Course';
import { fetchRankingData, RankingUser } from '@/services/api/ranking';

interface CourseWithSubscription extends Course {
  isSubscribed: boolean;
}

export default function Home() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<CourseWithSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rankingUsers, setRankingUsers] = useState<RankingUser[]>([]);
  const [isRankingLoading, setIsRankingLoading] = useState<boolean>(true);

  useEffect(() => {

    async function fetchCoursesAndSubscriptionStatus() {
      try {
        if (!user) return;
        const [allCoursesResponse, userCoursesResponse] = await Promise.all([
          fetchAllCourses(),
          fetchAllUserCourses(user.id.toString())
        ]);

        const allCoursesData = allCoursesResponse.data;

        const userSubscribedIds = new Set(userCoursesResponse.map((c: Course) => c.id));
        const coursesWithStatus = allCoursesData.map((course: Course) => ({
          ...course,
          isSubscribed: userSubscribedIds.has(course.id)
        }));

        setCourses(coursesWithStatus);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
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
    fetchCoursesAndSubscriptionStatus();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const handleSubscriptionChange = (courseId: string) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, isSubscribed: true } : course
      )
    );
  };

  return (
    <div className="grid min-h-screen w-full overflow-x-hidden grid-cols-4 grid-rows-[auto,1fr,auto] gap-24 bg-grid-pattern">
      <Header />

      <div className="relative col-span-full w-full">
        <div className="mx-10 md:mx-20 flex flex-row">
          <div className="flex items-start justify-start">
            <UserProgression />
          </div>

          <div className="absolute right-0 flex items-end justify-end hidden xl:flex">
            <CircuitTopRight />
          </div>
        </div>
      </div>

      <div className="relative col-span-full row-auto w-full">
        <div className="ml-10 md:ml-20 flex items-start justify-between">
          <div className="mr-10 flex flex-col items-start justify-start gap-20">
            {/* Cursos */}
            <CoursesTemplate
              Icon={CourseIcon}
              title="Cursos disponíveis"
              IsRectangle={false}
              courses={courses}
              onSubscriptionChange={handleSubscriptionChange}
            ></CoursesTemplate>

            {/* Laboratórios */}
            <CoursesTemplate
              Icon={LabIcon}
              title="Laboratórios virtuais"
              IsRectangle={true}
              labs={mockVirtualLabs}
            ></CoursesTemplate>
          </div>

          <Ranking>
            {isRankingLoading ? (
              <p>Carregando ranking...</p>
            ) : (
              <RankingItem users={rankingUsers} />
            )}
          </Ranking>
        </div>

        <CircuitHome className="absolute bottom-0 right-0 -z-10"></CircuitHome>
      </div>
      <Footer></Footer>
    </div>
  );
}
