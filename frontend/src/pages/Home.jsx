import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/payments')
      .then((response) => {
        setPayments(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Payments List</h1>
        <Link to='/payments/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-2'>
          <thead>
            <tr>
              <tr>
                <th className='border border-slate-600 rounded-md'>Bank Name</th>
                <th className='border border-slate-600 rounded-md'>Branch</th>
                <th className='border border-slate-600 rounded-md'>Date</th>
                <th className='border border-slate-600 rounded-md'>Price in number</th>
                <th className='border border-slate-600 rounded-md'>Price in word</th>
                <th className='border border-slate-600 rounded-md'>Operations</th>
              </tr>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => {
              <tr key={payment._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {payment.bankName}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {payment.branch}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {payment.date}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {payment.priceInNumber}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {payment.priceInWord}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
                    <Link to={`/payments/details/${payment._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/payments/edit/${payment._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/payments/delete/${payment._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Home