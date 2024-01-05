import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Table from "../components/Table";

const Home = () => {
  const entity = 123740;

  return (
    <div className='wrapper'>
      <Navbar/>
      <div className='container'>
        <SideBar />
        <Table entity={entity}/>
      </div>

    </div>
  )
}

export default Home;