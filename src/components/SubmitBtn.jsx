import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text }) => {
  // useNavigation is a custom hook that returns the navigation object
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      className="btn btn-primary btn-block"
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>sending...
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitBtn;
