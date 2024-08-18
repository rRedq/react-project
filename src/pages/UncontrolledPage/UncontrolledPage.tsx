import { UncontrolledForm } from 'features/UncontrolledForm';
import { FC } from 'react';
import style from 'shared/styles/FormPage/FormPage.module.scss';

export const UncontrolledPage: FC = () => {
  return (
    <div className={style.formContainer}>
      <h2>Uncontrolled Form</h2>
      <UncontrolledForm />
    </div>
  );
};
