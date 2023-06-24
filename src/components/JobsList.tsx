import "./JobsList.css";
import useFetch from "../hooks/useFetch";

type JobItem = {
  data: {
    jobs: {
      id: number;
      name: string;
      summary: string;
      location: {
        text: string;
      };
      updated_at: string;
      created_at: string;
      tags: {
        name: string;
        value: string;
      }[];
    }[];
  };
  loading: boolean;
};

function JobsList() {
  const { data, loading } =
    useFetch<JobItem>(
      "https://api.hrflow.ai/v1/jobs/searching?board_keys=%5B%22887595b735d68f0bc0b0b0535f7d8f7d158a3f4e%22%5D&page=1&limit=10&order_by=desc"
    ) || {};

  console.log(data);

  if (loading) return <div>Loading ...</div>;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Loaction</th>
          <th>Category</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data?.data.jobs.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.location.text}</td>
            <td>
              {item.tags.find(tag => tag.name === 'category')?.value || 'Unspecified'}
            </td>
            <td>{new Date(item.created_at).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default JobsList;
