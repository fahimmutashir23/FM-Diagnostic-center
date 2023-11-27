import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useBannerData = () => {
    const axiosPublic = useAxiosPublic();

    const {
      data: banner = [],
      isPending,
      refetch,
    } = useQuery({
      queryKey: ["banner"],
      queryFn: async () => {
        const res = await axiosPublic(`/banners?isActive=true`);
        return res.data[0];
      },
    });

    return [banner, isPending, refetch]
};

export default useBannerData;