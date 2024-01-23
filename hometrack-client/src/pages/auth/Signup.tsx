import { useSignUp } from "@clerk/clerk-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialInputErrorState = {
    email: "",
    password: "",
    verificationCode: "",
};

export default function Signup() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
        verificationCode: "",
    });
    const [inputErrors, setInputErrors] = useState(initialInputErrorState);
    const [pendingVerification, setPendingVerification] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const updateInput = (inputName: keyof typeof inputs, inputVal: string) =>
        setInputs((prev) => ({
            ...prev,
            [inputName]: inputVal,
        }));

    const updateInputError = (
        inputErrorName: keyof typeof inputErrors,
        inputErrorMsg: string
    ) =>
        setInputErrors((prev) => ({
            ...prev,
            [inputErrorName]: inputErrorMsg,
        }));

    const validateForm = () => {
        const { email, password, passwordConfirmation } = inputs;

        if (!email || !email.includes("@")) {
            const errMsg = "Invalid Email";
            updateInputError("email", errMsg);
            throw errMsg;
        }

        if (password !== passwordConfirmation) {
            const errMsg = "Password and Password confirmation do not match";
            updateInputError("password", errMsg);
            throw errMsg;
        }

        setInputErrors(initialInputErrorState);
    };

    // start the sign up process.
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }

        const { email, password } = inputs;

        try {
            validateForm();

            setLoading(true);
            await signUp.create({
                emailAddress: email,
                password,
            });

            // send the email.
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            // change the UI to our pending section.
            setPendingVerification(true);
        } catch (err) {
            const error = err as {
                errors?: Array<{ code: string; message: string }>;
            };

            error.errors?.forEach((e) => {
                if (e.code === "form_identifier_exists") {
                    updateInputError("email", e.message);
                }
            });

            console.error(JSON.stringify(err, null, 2));
        } finally {
            setLoading(false);
        }
    };

    // This verifies the user using email code that is delivered.
    const onPressVerify = async (e: FormEvent) => {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }

        try {
            setLoading(true);

            const completeSignUp = await signUp.attemptEmailAddressVerification(
                {
                    code: inputs.verificationCode,
                }
            );

            if (completeSignUp.status !== "complete") {
                console.log(JSON.stringify(completeSignUp, null, 2));
            }

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                navigate("/");
            }
        } catch (err) {
            const error = err as {
                errors?: Array<{ code: string; message: string }>;
            };

            error.errors?.forEach((e) => {
                if (e.code === "form_code_incorrect") {
                    updateInputError(
                        "verificationCode",
                        "Verification code is incorrect"
                    );
                }
            });

            console.error(JSON.stringify(err, null, 2));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            {!pendingVerification && (
                <form className="flex flex-col items-center w-[512px]">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">
                                What is your email?
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="enter email address..."
                            value={inputs.email}
                            onChange={(e) =>
                                updateInput("email", e.target.value)
                            }
                            className="input input-bordered w-full"
                            style={{
                                border: inputErrors.email
                                    ? "1px solid red"
                                    : "",
                            }}
                        />
                    </label>

                    {!!inputErrors.email && (
                        <span className="text-red-500 mt-[16px]">
                            {inputErrors.email}
                        </span>
                    )}

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">
                                What is your password?
                            </span>
                        </div>
                        <input
                            type="password"
                            placeholder="enter email password..."
                            value={inputs.password}
                            onChange={(e) =>
                                updateInput("password", e.target.value)
                            }
                            className="input input-bordered w-full"
                            style={{
                                border: inputErrors.password
                                    ? "1px solid red"
                                    : "",
                            }}
                        />
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">
                                Please confirm your password?
                            </span>
                        </div>
                        <input
                            type="password"
                            placeholder="enter email password confirmation..."
                            value={inputs.passwordConfirmation}
                            onChange={(e) =>
                                updateInput(
                                    "passwordConfirmation",
                                    e.target.value
                                )
                            }
                            className="input input-bordered w-full"
                            style={{
                                border: inputErrors.password
                                    ? "1px solid red"
                                    : "",
                            }}
                        />
                    </label>

                    {!!inputErrors.password && (
                        <span className="text-red-500 mt-[16px]">
                            {inputErrors.password}
                        </span>
                    )}

                    {!loading && (
                        <button
                            className="btn btn-accent mt-[16px]"
                            onClick={handleSubmit}
                        >
                            Sign up
                        </button>
                    )}

                    {loading && (
                        <span className="loading loading-spinner loading-lg mt-[16px]"></span>
                    )}
                </form>
            )}
            {pendingVerification && (
                <form className="flex flex-col items-center w-[512px]">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">
                                Enter your verification code
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="verification code..."
                            value={inputs.verificationCode}
                            onChange={(e) =>
                                updateInput("verificationCode", e.target.value)
                            }
                            className="input input-bordered w-full"
                            style={{
                                border: inputErrors.verificationCode
                                    ? "1px solid red"
                                    : "",
                            }}
                        />
                    </label>

                    {!!inputErrors.verificationCode && (
                        <span className="text-red-500 mt-[16px]">
                            {inputErrors.verificationCode}
                        </span>
                    )}

                    {!loading && (
                        <button
                            className="btn btn-accent mt-[16px]"
                            onClick={onPressVerify}
                        >
                            Verify Email
                        </button>
                    )}

                    {loading && (
                        <span className="loading loading-spinner loading-lg mt-[16px]"></span>
                    )}
                </form>
            )}
        </div>
    );
}
