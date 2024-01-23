import { useSignIn } from "@clerk/clerk-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialInputErrorState = {
    email: "",
    password: "",
    emailOrPassword: "",
    clerkServerError: "",
};

export default function Signin() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const [inputErrors, setInputErrors] = useState(initialInputErrorState);
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
        const { email, password } = inputs;

        let formHasError = false;

        if (!email || !email.includes("@")) {
            const errMsg = "Invalid email";
            updateInputError("email", errMsg);
            formHasError = true;
        } else {
            updateInputError("email", "");
        }

        if (!password) {
            const errMsg = "Invalid password";
            updateInputError("password", errMsg);
            formHasError = true;
        } else {
            updateInputError("password", "");
        }

        if (formHasError) {
            throw "There was an error";
        } else {
            setInputErrors(initialInputErrorState);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }

        try {
            validateForm();

            setLoading(true);

            const { email, password } = inputs;
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                navigate("/", { replace: true });
            } else {
                /*Investigate why the login hasn't completed */
                console.log(result);
            }
        } catch (err) {
            const error = err as {
                errors?: Array<{ code: string; message: string }>;
            };

            console.log(JSON.stringify(err, null, 4));

            error.errors?.forEach((e) => {
                if (e.code === "form_identifier_not_found") {
                    updateInputError(
                        "emailOrPassword",
                        "Invalid email or password"
                    );
                }

                // actually ran into this while testing
                if (e.code === "internal_clerk_error") {
                    updateInputError(
                        "clerkServerError",
                        "Apologies, there was an error in our authentication system. Please try again later."
                    );
                }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <form className="flex flex-col items-center w-[512px]">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">What is your email?</span>
                    </div>
                    <input
                        type="text"
                        placeholder="enter email address..."
                        value={inputs.email}
                        onChange={(e) => updateInput("email", e.target.value)}
                        className="input input-bordered w-full"
                        style={{
                            border:
                                inputErrors.email || inputErrors.emailOrPassword
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
                            border:
                                inputErrors.password ||
                                inputErrors.emailOrPassword
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

                {!!inputErrors.emailOrPassword && (
                    <span className="text-red-500 mt-[16px]">
                        {inputErrors.emailOrPassword}
                    </span>
                )}

                {!!inputErrors.clerkServerError && (
                    <span className="text-red-500 mt-[16px]">
                        {inputErrors.clerkServerError}
                    </span>
                )}

                {!loading && (
                    <button
                        className="btn btn-accent mt-[16px]"
                        onClick={handleSubmit}
                    >
                        Sign in
                    </button>
                )}

                {loading && (
                    <span className="loading loading-spinner loading-lg mt-[16px]"></span>
                )}
            </form>
        </div>
    );
}
