import React from 'react'


function IncomeTransaction() {
  return (
    <div className='container-xxl' style={{ height:"100vh"}}>
        <div className='container d-flex p-5'>
            <div className='p-3 w-100'>
                <h3 className='mb-4'>Income Transaction</h3>
                <table border='1px' className='w-100 border-collapse text-middle'>
                   <thead>
                        <tr className='bg-info bg-opacity-50'>
                            <th className='border border-1 border-dark py-2 ps-1'>
                                No
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Name
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Address
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Post Code
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Product Order
                            </th>
                            <th className='border border-1 border-dark ps-1'>
                                Status
                            </th>

                        </tr>
                   </thead>
                   <tbody>
                        <tr>
                            <td className='border border-1 border-dark py-2 ps-1'>
                                1
                            </td >
                            <td className='border border-1 border-dark ps-1'>
                                Tidak Ada Akhlak
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Cileungsi
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                16820
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Geprek Ways
                            </td>
                            <td className='border border-1 border-dark ps-1'>
                                Waiting Approve
                            </td>

                        </tr>    
                            
                   </tbody>

                </table>
            </div>
        </div>
    </div>
  )
}

export default IncomeTransaction