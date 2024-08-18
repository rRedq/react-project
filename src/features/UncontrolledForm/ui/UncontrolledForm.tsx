import { FC, FormEvent, useRef, useState } from 'react';
import style from 'shared/styles/Form/Form.module.scss';
import { ValidationError } from 'yup';
import { schema } from 'shared/const';
import { BaseDataType, Paths } from 'shared/types';
import { useDispatch, useSelector } from 'react-redux';
import { addCard, changeAnimateStatus, getCountries } from 'entities/Cards';
import { useNavigate } from 'react-router-dom';
import { convertImage } from 'shared/utils';
import { PasswordProgress } from 'shared/lib/ui';

interface DataType extends Omit<Partial<BaseDataType>, 'image'> {
  image?: FileList | null;
}

export const UncontrolledForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(getCountries);
  const [errors, setErrors] = useState<Map<keyof DataType, string>>();
  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirm = useRef<HTMLInputElement>(null);
  const gender = useRef<HTMLSelectElement>(null);
  const termRef = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setErrors(undefined);

      const data: DataType = {
        name: name.current?.value,
        age: Number(age.current?.value),
        email: email.current?.value,
        password: password.current?.value,
        passwordConfirm: passwordConfirm.current?.value,
        gender: gender.current?.value,
        term: termRef.current?.checked ? true : false,
        image: image.current?.files,
        country: country.current?.value,
      };

      const result = await schema.validate(data, {
        abortEarly: false,
      });

      const img: File | undefined = image.current?.files?.length
        ? image.current?.files[0]
        : undefined;
      const img64 = (await convertImage(img)) || '';

      const cards: BaseDataType = { ...result, image: img64 };
      dispatch(addCard(cards));
      setTimeout(() => dispatch(changeAnimateStatus()), 5000);
      navigate(Paths.MAIN);
    } catch (e) {
      const error = e as ValidationError;
      const newErrors = new Map<keyof DataType, string>();

      error.inner.forEach((item) => {
        const key = item.path as keyof DataType;
        if (item.path && !newErrors.has(key)) newErrors.set(key, item.message);
      });
      setErrors(newErrors);
    }
  };

  return (
    <form className={style.wrapper} onSubmit={submitHandler} autoComplete="off">
      <div className={style.ceil}>
        <label className={style.label} htmlFor="name">
          Name:
          <input ref={name} id="name" type="text" />
        </label>
        <p className={style.error}>{errors?.get('name')}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="age">
          Age:
          <input ref={age} type="number" id="age" />
        </label>
        <p className={style.error}>{errors?.get('age')}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="email">
          Email:
          <input ref={email} type="email" id="email" />
        </label>
        <p className={style.error}>{errors?.get('email')}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="password">
          Password:
          <input
            ref={password}
            type="password"
            autoComplete="true"
            id="password"
          />
        </label>
        <PasswordProgress password={password.current?.value} />
        <p className={style.error}>{errors?.get('password')}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="confirm">
          <div>
            <p>Confirm</p>
            <p>password:</p>
          </div>
          <input
            ref={passwordConfirm}
            type="password"
            autoComplete="true"
            id="confirm"
          />
        </label>
        <p className={style.error}>{errors?.get('passwordConfirm')}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="country">
          Country:
          <input ref={country} list="country" type="text" />
          <datalist id="country">
            {countries.map((country, i) => (
              <option key={i}>{country}</option>
            ))}
          </datalist>
        </label>
        <p className={style.error}>{errors?.get('country')}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="gender">
          Gender:
          <select ref={gender} id="gender">
            <option>Male</option>
            <option>Female</option>
            <option>Helicopter</option>
          </select>
        </label>
        <p className={style.error}>{errors?.get('gender')}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="image">
          Image:
          <label className="commonBtn">
            <input
              ref={image}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              id="image"
            />
            Upload
          </label>
        </label>
        <p className={style.error}>{errors?.get('image')}</p>
      </div>
      <div className={style.ceil}>
        <label className={style.label} htmlFor="term">
          I agree with T&C:
          <input ref={termRef} type="checkbox" id="term" />
        </label>
        <p className={style.error}>{errors?.get('term')}</p>
      </div>
      <button className="commonBtn" type="submit">
        Submit
      </button>
    </form>
  );
};
