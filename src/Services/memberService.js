const addMember = (data) => {
  const clanovi = JSON.parse(localStorage.getItem("clanovi"));
  clanovi.push(data);
  localStorage.setItem("clanovi", JSON.stringify(clanovi));
  console.log(clanovi);
};

const getMembers = () => {
  return JSON.parse(localStorage.getItem("clanovi"));
};

const memberService = { addMember, getMembers };

export default memberService;
