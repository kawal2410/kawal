import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return data;
  } catch (error) {
    throw new Error("Unable to fetch users");
  }
};

const Home = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: "users",
    queryFn: fetchUsers,
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
