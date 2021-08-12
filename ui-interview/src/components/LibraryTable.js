import React, { useEffect, useState } from 'react';
import SearchIco from './../assets/svg/search.svg';
const LibraryTable = () => {
  const [libraryData, setLibraryData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(()=>{
    fetch('http://localhost:3004/books')
    .then((res)=> res.json())
    .then((data=>{
      console.log(data);
      setLibraryData(data);
      setSearchData(data);
    }))
    .catch((err)=>{
      console.log(err);
    })
  },[]);

  const searchBook = (e) => {
    // console.log(e.target.value);
    let filteredData = [],
    searchKey = e.target.value;
    filteredData = libraryData.filter((data)=>data.bookName.toLowerCase().includes(searchKey.toLowerCase()))
    console.log(filteredData);
    setSearchData(filteredData);
  }

  return (
    <>
      <h5>Library</h5>
      <table>
        <thead className='table-head'>
          <th>Id</th>
          <th>
            {isSearchVisible ? 
              <>
                <input placeholder='Search Book' onChange={searchBook} />
                <button onClick={()=>setIsSearchVisible(false)}>x</button> 
              </>
              : 'Book Name'} 
            <button className='search-btn' onClick={()=>setIsSearchVisible(true)}>
              <img src={SearchIco} alt='search-icon'/>
            </button>
          </th>
          <th>Publisher</th>
          <th>Issue Date</th>
          <th>Return Date</th>
          <th>Status</th>
        </thead>
        <tbody>
          {searchData.map((data, j) =>
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.bookName}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default LibraryTable;