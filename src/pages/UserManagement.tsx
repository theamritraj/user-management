import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsPencilFill, BsTrashFill, BsFillPersonPlusFill } from "react-icons/bs";
import { Button } from "../components/Button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/Table";

interface User {
  id: number;
  name: string;
  email: string;
}

function UserManagement() {
  const { register, handleSubmit, reset } = useForm<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const onSubmit = (data: User) => {
    if (editUserId !== null) {
      setUsers(users.map(user => (user.id === editUserId ? { ...user, ...data } : user)));
      setEditUserId(null);
    } else {
      const { id, ...userData } = data; // Remove id from data
      setUsers([...users, { id: Date.now(), ...userData }]);
    }
    reset();
  };
  
  

  const handleEdit = (user: User) => {
    reset(user);
    setEditUserId(user.id);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <main className="main-container">
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <BsFillPersonPlusFill className="text-blue-500 text-3xl" /> User Management
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 mb-4">
          <input {...register("name", { required: true })} placeholder="Name" className="border p-2 rounded w-full" />
          <input {...register("email", { required: true })} placeholder="Email" className="border p-2 rounded w-full" />
          <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editUserId ? "Update" : "Add"}</Button>
        </form>
      </div>

      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="button-group">
                    <Button variant="outline" className="button button-edit" onClick={() => handleEdit(user)}>
                      <BsPencilFill />
                    </Button>
                    <Button variant="destructive" className="button button-delete" onClick={() => handleDelete(user.id)}>
                      <BsTrashFill />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

export default UserManagement;
