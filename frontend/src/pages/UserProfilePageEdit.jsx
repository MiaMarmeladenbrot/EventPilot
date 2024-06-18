import HeaderNav from "../components/HeaderNav";
import CustomInput from "../components/CustomInput";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import CustomButton from "../components/CustomButton";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api";
import Categories from "../components/Categories";

const UserProfilePageEdit = () => {
  const { user, setUser } = useContext(UserContext);
  const [firstname, setFirstname] = useState(user?.user?.firstname || "Firstname");
  const [lastname, setLastname] = useState(user?.user?.lastname || "Lastname");
  const [username, setUsername] = useState(user?.user?.username || "Username");
  const [bio, setBio] = useState(user?.user?.bio || "About me");
  const [categoriesArray, setCategoriesArray] = useState(user?.user?.interests);
  const [toggleDeletePopup, setToggleDeletePopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    formData.append("interests", categoriesArray);

    const res = await fetch(`${backendUrl}/api/v1/users`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    setUser({ ...user, user: data.user });
    localStorage.setItem("user", JSON.stringify({ ...user, user: data.user }));

    setTimeout(() => {
      navigate("/userprofile");
    }, 10);
  };

  const handleDeleteUser = async () => {
    console.log("Delete");
    setToggleDeletePopup(true);
  };

  return (
    <div className="min-h-svh">
      <HeaderNav />
      {!toggleDeletePopup && (
        <section>
          <div className=" flex justify-center mb-[40px] mt-2">
            {user?.user?.profileImage?.public_id ? (
              <img
                src={user?.user?.profileImage?.secure_url}
                className=" rounded-full max-h-40"
                alt="User Image"
              />
            ) : (
              <img
                className=" rounded-full max-h-40"
                src="/images/avatar_default.png"
                alt="User Image"
              />
            )}
          </div>
          <form className="flex flex-col gap-6 px-8" onSubmit={handleSubmitEdit}>
            <CustomInput
              type={"text"}
              label={"Firstname"}
              icon={<AccountCircleIcon sx={{ color: "#00ECAA" }} />}
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              name="firstname"
            />
            <CustomInput
              type={"text"}
              label={"Lastname"}
              icon={<AccountCircleIcon sx={{ color: "#00ECAA" }} />}
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              name="lastname"
            />
            <CustomInput
              type={"text"}
              label={"Username"}
              icon={<AccountCircleOutlinedIcon sx={{ color: "#00ECAA" }} />}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              name="username"
            />

            <TextField
              id="outlined-multiline-static"
              // label="Multiline"
              multiline
              rows={6}
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              name="bio"
            />
            <Categories categoriesArray={categoriesArray} setCategoriesArray={setCategoriesArray} />
            <input type="file" name="profileImage" />
            <CustomButton
              fontSize={"16px"}
              width={"100%"}
              borderRadius={"15px"}
              bgcolor={"#7254EE"}
              bgcolorHover={"#5D3EDE"}
              padding={"16px"}
              text={"Submit Edit"}
              endIcon={<ArrowCircleRightIcon />}
              type="submit"
            />
          </form>
          <div className="px-8 mt-4">
            <CustomButton
              fontSize={"16px"}
              width={"100%"}
              borderRadius={"15px"}
              bgcolor={"#f87171"}
              bgcolorHover={"#5D3EDE"}
              padding={"16px"}
              text={"Delete User"}
              endIcon={<DeleteIcon />}
              onClick={handleDeleteUser}
            />
          </div>
        </section>
      )}

      {toggleDeletePopup && (
        <div className="h-svh w-full absolute top-0 left-0 bg-white z-20"></div>
      )}
    </div>
  );
};

export default UserProfilePageEdit;
