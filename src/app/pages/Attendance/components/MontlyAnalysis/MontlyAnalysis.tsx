import {Card} from 'app/Components/Card/Card'
import { Strings } from 'app/resource/Strings';
import React from 'react'
interface MonthlyAnalysisProps {
  data: {label: string; value: any}[]
}
const MonthlyAnalysis: React.FC<MonthlyAnalysisProps> = ({data}) => {
  return (
    <div className='col-xl-6'>
      <Card className='card card-xl-stretch mb-xl-8 border-0'>
        <div className='card-body py-3'>
                  <div className='table-responsive'>
                    <div
                      id='kt_profile_overview_table_wrapper'
                      className='dataTables_wrapper dt-bootstrap4 no-footer'
                    >
                      <div className='table-responsive'>
                        <table
                          id='kt_profile_overview_table'
                          className='table table-row-bordered table-row-dashed gy-4 align-middle fw-bold dataTable no-footer'
                        >
                          <thead className='fs-7 text-gray-400 text-uppercase'>
                            <tr>
                              <th
                                className='min-w-150px sorting'
                                aria-controls='kt_profile_overview_table'
                                rowSpan={1}
                                colSpan={1}
                                aria-label='Start date - End date: activate to sort column ascending'
                              >
                                {Strings.days}
                              </th>
                              <th
                                className='min-w-150px sorting'
                                aria-controls='kt_profile_overview_table'
                                rowSpan={1}
                                colSpan={1}
                                aria-label='Leave Added Date: activate to sort column ascending'
                              >
                                   {Strings.count}
                              </th>
                            </tr>
                          </thead>
                          <tbody className='fs-6'>
                            {data?.map((item, index) => {
                              return (
                                <tr key={`${index}`} className={index % 2 === 0 ? 'even' : 'odd'}>
                                  <td data-order='2023-02-21T00:00:00+05:30'>{item?.label}</td>
                                  <td data-order='2023-02-21T00:00:00+05:30'>{item?.value}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
      </Card>
    </div>
  )
}

export default MonthlyAnalysis
