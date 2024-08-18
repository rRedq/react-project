import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from 'shared/const';
import style from 'shared/styles/Form/Form.module.scss';
import { BaseDataType, Paths } from 'shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { addCard, getCountries } from 'entities/Cards';
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

    navigate(Paths.MAIN);
  };

  return (
    <form
      className={style.wrapper}
      onSubmit={handleSubmit(submitHandler)}
      noValidate
    >
      <div className={style.ceil}>
        <label className={style.label}>
          Name:
          <input {...register('name')} type="text" />
        </label>
        <p className={style.error}>{errors?.name?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label}>
          Age:
          <input {...register('age')} type="number" />
        </label>
        <p className={style.error}>{errors?.age?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label}>
          Email:
          <input {...register('email')} type="email" />
        </label>
        <p className={style.error}>{errors?.email?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label}>
          Password:
          <input
            {...register('password')}
            type="password"
            autoComplete="true"
          />
        </label>
        <PasswordProgress password={passwordWatch} />
        <p className={style.error}>{errors?.password?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label}>
          <div>
            <p>Confirm</p>
            <p>password:</p>
          </div>
          <input
            {...register('passwordConfirm')}
            type="password"
            autoComplete="true"
          />
        </label>
        <p className={style.error}>{errors?.passwordConfirm?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label}>
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
        <label className={style.label}>
          Gender:
          <select {...register('gender')}>
            <option>Male</option>
            <option>Female</option>
            <option>Helicopter</option>
          </select>
        </label>
        <p className={style.error}>{errors?.gender?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label}>
          Image:
          <label className="commonBtn">
            <input
              {...register('image')}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
            />
            Upload
          </label>
        </label>

        <p className={style.error}>{errors?.image?.message}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label}>
          I agree with T&C:
          <input {...register('term')} type="checkbox" />
        </label>
        <p className={style.error}>{errors?.term?.message}</p>
      </div>
      <button className="commonBtn" type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};
