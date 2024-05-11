import { sendOtp } from "../../services/auth";
import { p2e } from "../../utils/numbers";

import styles from "./SendOtpForm.module.css";

const SendOtpForm = ({ mobile, setMobile, setStep }) => {
  const submitHandler = async (event) => {
    event.preventDefault();

    if (mobile.length !== 11) return;
    const { response, error } = await sendOtp(mobile);
    if (response) setStep(2);
    if (error) console.log(error.response.data.message);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار،لطفا شماره تلفن همراه خود را وارد کنید.کد
        تایید به این شماره پیامک خواهد شد.
      </span>
      <label htmlFor="input"></label>
      <input
        type="text"
        id="input"
        value={p2e(mobile)}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="شماره موبایل"
      />
      <button type="submit">ارسال کد تایید</button>
    </form>
  );
};

export default SendOtpForm;
