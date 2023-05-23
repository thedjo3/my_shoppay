import Layout from "../../../components/admin/layout";
import db from "../../../utils/db";
import User from "../../../models/User";
import EnhancedTable from "../../../components/admin/users/table";
import { useState } from "react";

export default function users({ users }) {
  const [data, setData] = useState(users);
  console.log(users);
  return (
    <Layout>
      <EnhancedTable rows={data} setRows={setData}/>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  await db.connectDb();
  const users = await User.find({}).sort({ createdAt: -1 }).lean();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
