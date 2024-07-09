import { ElementType } from 'react';
import Button from '../form/Button';
import ModalSquareForm from '../wrapper/ModalSquareForm';

interface CoursesTemplateProps {
  title: string;
  Icon: ElementType;
}

export default function CoursesTemplate({ title, Icon }: CoursesTemplateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <div className="mr-auto flex items-center justify-center gap-3">
        <Icon></Icon>
        <h2 className="mr-auto text-4xl font-bold">{title}</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-20">
        <ModalSquareForm>
          <div className="m-10 h-[166px] w-[166px] bg-cinza"></div>
        </ModalSquareForm>
        <ModalSquareForm>
          <div className="m-10 h-[166px] w-[166px] bg-cinza"></div>
        </ModalSquareForm>
        <ModalSquareForm>
          <div className="m-10 h-[166px] w-[166px] bg-cinza"></div>
        </ModalSquareForm>
      </div>
      <Button text="Ver mais"></Button>
    </div>
  );
}
