import UniversityDetails from './universityDetails';
import ReactPaginate from 'react-paginate';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const UniversityList = ({ universities, universityTotal }) => {
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ endOffset, setEndOffset ] = useState(20);
    const router = useRouter();

    useEffect(() => {
        const header = document.querySelector('#gridHeader');
        const content = document.querySelector('#gridContent');

        const adjustHeaderAlignment = () => {
            if (content.scrollHeight > content.clientHeight) {
                header.classList.add('pr-6');
            } else {
                header.classList.remove('pr-6');
            }
        }

        window.addEventListener('resize', adjustHeaderAlignment);
        
        adjustHeaderAlignment();

        return () => {
            window.removeEventListener('resize', adjustHeaderAlignment);
        }
    })

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
            <div className='border-4 border-b-0 border-sky-800'>
                <header id='gridHeader' className='grid grid-cols-[minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_2fr)_minmax(0,_2fr)] p-2 gap-x-2 font-bold text-white bg-sky-800'>
                    <div>Name</div>
                    <div>State/Province</div>
                    <div>Country</div>
                    <div>Alpha-2-Code</div>
                    <div>Domains</div>
                    <div>Web Pages</div>
                </header>
                <main id='gridContent' className='grid grid-cols-1 content-start h-[85vh] overflow-y-auto'>
                    {
                        universities.map(university => {
                            return (
                                <UniversityDetails key={university.id} university={university} />
                            )
                        })
                    }
                </main>              
            </div>
            <footer className='flex justify-between text-white bg-sky-800'>
                <div className='w-fit p-2'>
                    {`Showing ${currentPage} to ${endOffset} of ${universityTotal}`}
                </div>
                <ReactPaginate
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={8}
                    marginPagesDisplayed={2}
                    pageCount={universityTotal / 20}
                    previousLabel='<'
                    nextLabel='>'
                    pageClassName='p-2 hover:bg-sky-900'
                    pageLinkClassName=''
                    previousClassName='p-2 hover:bg-sky-900'
                    previousLinkClassName=''
                    nextClassName='p-2 hover:bg-sky-900'
                    nextLinkClassName=''
                    breakLabel='...'
                    breakClassName='p-2 hover:bg-sky-900'
                    breakLinkClassName=''
                    containerClassName='flex'
                    activeClassName='font-bold bg-sky-900'
                    renderOnZeroPageCount={null}
                />
            </footer>
        </>
    )
}

export default UniversityList