// test.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchusersRequest } from '../../../../actions/userActions';
import { RootState } from '../../../../store/reducers';
import Link from "next/link";
import { Users } from '../../../../types/user'; // Import the Product type
import router from 'next/router';

const ExampleComponent: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.data);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  // Example values for company and type
  const company = 'yourCompany';
  const type = 'yourType';

  useEffect(() => {
    dispatch(fetchusersRequest(company, type));
    // ... rest of your useEffect
  }, [dispatch, company, type]);

  return (
    <div>
      <Link href="/test2">
        <p>Products</p>
      </Link>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {Array.isArray(users) && users.length > 0 ? (

        <div>
          <h2>Product Data</h2>
          <ul>
            {users.map((user: Users) => (
              <li key={user.id} className="mb-4 p-4 border rounded">
                <Link
                  href={`${router.asPath}/${user.id}`}
                  className="text-blue-500"
                >
                  <strong>ID:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.id}</span>
                  <br />
                  <strong>First Name:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.firstName}</span>
                  <br />
                  <strong>Last Name:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.lastName}</span>
                  <br />
                  <strong>Age:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.age}</span>
                  <br />
                  <strong>Email:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.email}</span>
                  <br />
                  <strong>Store 1:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.store1 ? "Yes" : "No"}</span>
                  <br />
                  <strong>Store 2:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.store2 ? "Yes" : "No"}</span>
                  <br />
                  <strong>Store 3:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.store3 ? "Yes" : "No"}</span>
                  <br />
                  <strong>Store 4:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.store4 ? "Yes" : "No"}</span>
                  <br />
                  <strong>Role:</strong> <br className=" sm:hidden"/> <span className=" text-black">{user.role}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
              ) : null}

    </div>
  );
};

export default ExampleComponent;
