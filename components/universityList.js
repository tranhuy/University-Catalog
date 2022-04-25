import UniversityDetails from './universityDetails';
import ReactPaginate from 'react-paginate';

import { useState } from 'react';
import { useRouter } from 'next/router';

const UniversityList = ({ universities, universityTotal }) => {
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ endOffset, setEndOffset ] = useState(20);
    const router = useRouter();

    const handlePageClick = event => {
        const page = event.selected;
        setCurrentPage(page * 20 + 1);

        if ((page + 1) * 20 > universityTotal) {
            setEndOffset(universityTotal);
        } else {
            setEndOffset((page + 1) * 20);
        }
        
        router.push(`/${page > 0 ? page : ''}`);
    }
    
    return (
        <>
            <header className='grid grid-cols-6 p-2 gap-x-2 font-bold text-white bg-sky-800'>
                <div>Name</div>
                <div>State/Province</div>
                <div>Country</div>
                <div>Alpha-2-Code</div>
                <div>Domains</div>
                <div>Web Pages</div>
            </header>
            <main className='grid grid-cols-1'>
                {
                    universities.map(university => {
                        return (
                            <UniversityDetails key={university.id} university={university} />
                        )
                    })
                }
            </main>
            <footer className='flex justify-between p-2 text-white bg-sky-800'>
                <div className='w-fit'>
                    {`Showing ${currentPage} to ${endOffset} of ${universityTotal}`}
                </div>
                <ReactPaginate
                    nextLabel='>'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={10}
                    marginPagesDisplayed={4}
                    pageCount={universityTotal / 20}
                    previousLabel='<'
                    pageClassName=''
                    pageLinkClassName=''
                    previousClassName=''
                    previousLinkClassName=''
                    nextClassName=''
                    nextLinkClassName=''
                    breakLabel='...'
                    breakClassName=''
                    breakLinkClassName=''
                    containerClassName='flex space-x-5'
                    activeClassName='font-bold'
                    renderOnZeroPageCount={null}
                />
            </footer>
        </>
    )
}

export default UniversityList