import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from './Table';

const Main = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.223.98.72:1337/api/students'); 
        const fetchedData = response.data.data.map(item => ({
          id: item.id,
          firstName: item.attributes.firstName,
          lastName: item.attributes.lastName,
          parentContactNo: item.attributes.parentContactNo,
          parentEmailId: item.attributes.parentEmailId,
         
        }));
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },

      {
        Header: 'Parent Contact No',
        accessor: 'parentContactNo',
      },
      {
        Header: 'Parent Email ID',
        accessor: 'parentEmailId',
      }
      
    ],
    []
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Main">
      <h1> Student Table</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Main;
