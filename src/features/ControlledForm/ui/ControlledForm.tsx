import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from 'shared/const';
import style from 'shared/styles/Form/Form.module.scss';
import { BaseDataType, Paths } from 'shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { addCard, changeAnimateStatus, getCountries } from 'entities/Cards';
import { useNavigate } from 'react-router-dom';
import { convertImage } from 'shared/utils';
import { PasswordProgress } from 'shared/lib/ui';

interface DataType extends Omit<BaseDataType, 'image'> {
  image: FileList;
}

export const ControlledForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(getCountries);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const passwordWatch = watch('password');

  const submitHandler: SubmitHandler<DataType> = async ({
    name,
    age,
    gender,
    password,
    passwordConfirm,
    image,
    email,
    country,
    term,
  }) => {
    const img64 = await convertImage(image[0]);

    dispatch(
      addCard({
        name,
        age,
        gender,
        password,
        passwordConfirm,
        email,
        image: img64,
        country,
        term,
      })
    );
    setTimeout(() => dispatch(changeAnimateStatus()), 5000);

    navigate(Paths.MAIN);
  };

  return (
    <form
      className={style.wrapper}
      onSubmit={handleSubmit(submitHandler)}
      noValidate
    >
      <div className={style.ceil}>
        <label className={style.label} htmlFor="name">
          Name:
          <input {...register('name')} type="text" id="name" />
        </label>
        <p className={style.error}>{errors?.name?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="age">
          Age:
          <input {...register('age')} type="number" id="age" />
        </label>
        <p className={style.error}>{errors?.age?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="email">
          Email:
          <input {...register('email')} type="email" id="email" />
        </label>
        <p className={style.error}>{errors?.email?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="password">
          Password:
          <input
            {...register('password')}
            type="password"
            autoComplete="true"
            id="password"
          />
        </label>
        <PasswordProgress password={passwordWatch} />
        <p className={style.error}>{errors?.password?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="confirm">
          <div>
            <p>Confirm</p>
            <p>password:</p>
          </div>
          <input
            {...register('passwordConfirm')}
            type="password"
            autoComplete="true"
            id="confirm"
          />
        </label>
        <p className={style.error}>{errors?.passwordConfirm?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="country">
          Country:
          <input {...register('country')} list="country" type="text" />
          <datalist id="country">
            {countries.map((country, i) => (
              <option key={i}>{country}</option>
            ))}
          </datalist>
        </label>
        <p className={style.error}>{errors?.country?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="gender">
          Gender:
          <select {...register('gender')} id="gender">
            <option>Male</option>
            <option>Female</option>
            <option>Helicopter</option>
          </select>
        </label>
        <p className={style.error}>{errors?.gender?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="image">
          Image:
          <label className="commonBtn">
            <input
              {...register('image')}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              id="image"
            />
            Upload
          </label>
        </label>
        <p className={style.error}>{errors?.image?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="term">
          I agree with T&C:
          <input {...register('term')} type="checkbox" id="term" />
        </label>
        <p className={style.error}>{errors?.term?.message}</p>
      </div>
      <button className="commonBtn" type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};
