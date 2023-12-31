import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUser = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allUsers = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const res = await axiosSecure("/users");
      return res.data;
    },
  });
  return [allUsers, isPending, refetch]
};

export default useAllUser;
