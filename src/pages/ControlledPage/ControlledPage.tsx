import { ControlledForm } from 'features/ControlledForm';
import { FC } from 'react';
import style from 'shared/styles/FormPage/FormPage.module.scss';

export const ControlledPage: FC = () => {
  return (
    <div className={style.formContainer}>
      <h2>Controlled Form</h2>
      <ControlledForm />
    </div>
  );
};
