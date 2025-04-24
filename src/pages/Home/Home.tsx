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
import { mockUsers } from '@/utils/mocks/mockUsers';
import { mockVirtualLabs } from '@/utils/mocks/mockVirtualLabs';
import { fetchAllCourses } from '@/services/api/course';

export default function Home() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchCourses() {
      try {
        const courses = await fetchAllCourses();
        console.log('Curso:', courses);
        console.log('Data:', courses.data);
        setCourses(courses.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch
      }
    }

    fetchCourses();
  }, []);

  if (isLoading) {
    // Show a loading spinner or placeholder while fetching
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-screen grid-cols-4 grid-rows-[auto,1fr,auto] gap-24 bg-grid-pattern">
      <Header />

      <div className="col-span-full w-full">
        <div className="ml-10 md:ml-20 grid grid-cols-2">
          <div className="flex items-start justify-start">
            <UserProgression username={user?.username} />
          </div>
          <div className="flex items-end justify-end">
            <CircuitTopRight />
          </div>
        </div>
      </div>

      <div className="relative col-span-full row-auto w-full">
        <div className="ml-10 md:ml-20 flex items-start justify-between">
          <div className="mr-10 flex flex-col items-start justify-start gap-20">
            <CoursesTemplate
              Icon={CourseIcon}
              title="Meus Cursos"
              IsRectangle={false}
              courses={courses}
            ></CoursesTemplate>

            {/* Os laboratórios estão utilizando o template de cursos, a diferença é o id na hora de abrir a página*/}
            <CoursesTemplate
              Icon={LabIcon}
              title="Laboratórios virtuais"
              IsRectangle={true}
              courses={mockVirtualLabs}
            ></CoursesTemplate>
          </div>

          <Ranking>
            <RankingItem users={mockUsers.users} />
          </Ranking>
        </div>

        <CircuitHome className="absolute bottom-0 right-0"></CircuitHome>
      </div>
      <Footer></Footer>
    </div>
  );
}
