"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { useAuth } from "@clerk/nextjs";
import SkillBadges from "@/components/SkillBadges";

export default function Home() {
  const { getToken } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("++++++++", res.data);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={data?.image}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{data?.name}</h1>
          <p className="text-gray-600 dark:text-gray-300">{data?.bio}</p>
          <div className="flex gap-4 mt-4">
            <a href={data?.github} target="_blank">
              GitHub
            </a>
            <a href={data?.linkedin} target="_blank">
              LinkedIn
            </a>
            <a href={data?.instagram} target="_blank">
              Instagram
            </a>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              <SkillBadges skills={data.skillsets} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
