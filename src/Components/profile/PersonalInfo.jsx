const PersonalInfo = ({
  isEditing,
  editProfile,
  setEditProfile,
  isSaving,
  profile,
}) => {
  return (
    <div className="mt-4 text-center">
      {" "}
      {isEditing ? (
        <div className="grid grid-cols-2 gap-3 text-left">
          {" "}
          <label className="flex flex-col gap-1.5 text-xs font-medium text-[#8A8178]">
            {" "}
            First name{" "}
            <input
              type="text"
              value={editProfile.firstName || ""}
              onChange={(e) =>
                setEditProfile({ ...editProfile, firstName: e.target.value })
              }
              disabled={isSaving}
              className="rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
            />{" "}
          </label>{" "}
          <label className="flex flex-col gap-1.5 text-xs font-medium text-[#8A8178]">
            {" "}
            Last name{" "}
            <input
              type="text"
              value={editProfile.lastName || ""}
              onChange={(e) =>
                setEditProfile({ ...editProfile, lastName: e.target.value })
              }
              disabled={isSaving}
              className="rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
            />{" "}
          </label>{" "}
        </div>
      ) : (
        <h2 className="text-2xl font-bold text-[#2B2A28]">
          {" "}
          {profile.firstName} {profile.lastName}{" "}
        </h2>
      )}{" "}
      {isEditing ? (
        <input
          type="number"
          value={editProfile.age || ""}
          onChange={(e) =>
            setEditProfile({ ...editProfile, age: e.target.value })
          }
          disabled={isSaving}
          placeholder="Age"
          className="mt-3 w-32 rounded-xl border border-[#EAE1D3] bg-[#FBF6EF] px-3 py-2 text-center text-sm text-[#2B2A28] outline-none transition focus:border-[#5B8C6E] focus:ring-2 focus:ring-[#5B8C6E]/30 disabled:opacity-50"
        />
      ) : (
        <p className="mt-1 text-sm text-[#756F68]">
          {" "}
          {profile.age ? `${profile.age} years old` : "Age not added yet"}{" "}
        </p>
      )}{" "}
    </div>
  );
};
export default PersonalInfo;
