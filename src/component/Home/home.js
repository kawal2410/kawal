import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const fetchUser = async (key, id) => {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return data;
  } catch (error) {
    throw new Error("Unable to fetch user");
  }
};

const Home = () => {
  const { id } = useParams;
  console.log(id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id], // Specify the query key as an array
    queryFn: fetchUser, // Specify the query function
    enabled: !!id, // Enable the query only if id is truthy
  });

  useEffect(() => {
    if (error) {
      console.error("Error fetching users:", error);
    }
  }, [error]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-around">
        <button className="border px-4 bg-red-500">prev</button>
        <button className="border px-4 bg-green-500">next</button>
      </div>

      {data &&
        data.map((user) => (
          <div key={user.id} className="border w-[20%] py-5">
            <div>{user.id}</div>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
          </div>
        ))}
    </div>
  );
};

export default Home;
