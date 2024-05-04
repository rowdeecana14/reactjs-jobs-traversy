import { useState, useReducer, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getJob, updateJob } from "../store/Api";
import { INITIALS, TYPES, formReducer } from "../store/JobReducer.js";
import Spinner from "../components/Spinner";
import { EditMessage } from "../utils/constants/JobConstant.js";

export default function EditJobPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, dispatch] = useReducer(formReducer, INITIALS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await getJob(id);

      if (response.success) {
        dispatch({
          type: TYPES.FETCH,
          fields: response.data,
        });
      }
      setIsLoading(false);
    };

    getData();
  }, []);

  const onChangeField = (event) => {
    dispatch({
      type: TYPES.INPUT,
      field: { name: event.target.name, value: event.target.value },
    });
  };

  const onSubmitJob = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const toastID = toast.loading(EditMessage.LOADING);
    const response = await updateJob({
      id,
      ...form.fields,
    });

    if (response.success) {
      toast.update(toastID, {
        render: EditMessage.SUCCESS,
        type: "success",
        isLoading: false,
        autoClose: true,
      });
    } else {
      toast.update(toastID, {
        render: EditMessage.ERROR,
        type: "error",
        isLoading: false,
      });
    }

    setIsLoading(false);
    return navigate(`/jobs/${id}`);
  };

  return isLoading ? (
    <Spinner loading={isLoading} />
  ) : (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={onSubmitJob}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Update Job
            </h2>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Type
              </label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                required
                value={form.fields.type}
                onChange={onChangeField}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Job Listing Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Beautiful Apartment In Miami"
                required
                value={form.fields.title}
                onChange={onChangeField}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc"
                value={form.fields.description}
                onChange={onChangeField}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Salary
              </label>
              <select
                id="salary"
                name="salary"
                className="border rounded w-full py-2 px-3"
                required
                value={form.salary}
                onChange={onChangeField}
              >
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - 60K">$50K - $60K</option>
                <option value="$60K - 70K">$60K - $70K</option>
                <option value="$70K - 80K">$70K - $80K</option>
                <option value="$80K - 90K">$80K - $90K</option>
                <option value="$90K - 100K">$90K - $100K</option>
                <option value="$100K - 125K">$100K - $125K</option>
                <option value="$125K - 150K">$125K - $150K</option>
                <option value="$150K - 175K">$150K - $175K</option>
                <option value="$175K - 200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Company Location"
                required
                value={form.fields.location}
                onChange={onChangeField}
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company.name"
                name="company.name"
                className="border rounded w-full py-2 px-3"
                placeholder="Company Name"
                value={form.fields.company.name}
                onChange={onChangeField}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="company_description"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Description
              </label>
              <textarea
                id="company.description"
                name="company.description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="What does your company do?"
                value={form.fields.company.description}
                onChange={onChangeField}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact_email"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="company.contactEmail"
                name="company.contactEmail"
                className="border rounded w-full py-2 px-3"
                placeholder="Email address for applicants"
                required
                value={form.fields.company.contactEmail}
                onChange={onChangeField}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact_phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                id="company.contactPhone"
                name="company.contactPhone"
                className="border rounded w-full py-2 px-3"
                placeholder="Optional phone for applicants"
                value={form.fields.company.contactPhone}
                onChange={onChangeField}
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
