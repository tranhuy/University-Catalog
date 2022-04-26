const UniversityDetails = ({ university }) => {
    return (
        <div className={`grid grid-cols-[minmax(0,_2fr)_minmax(0,_2fr)_minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_2fr)_minmax(0,_2fr)] gap-x-2 h-fit px-2 py-1 ${university.domains.length > 1 && 'bg-sky-900/10'} items-center border-b-2 last:border-b-0`}>
			<div>{university.name}</div>
			<div>{university.state_province}</div>
			<div>{university.country}</div>
			<div>{university.alpha_two_code}</div>
			<div>
				{
					university.domains.map(domain => <div key={domain.id}>{domain.domain_name}</div>)
				}
			</div>
			<div>
				{
					university.websites.map(site => <a key={site.id} href={site.url} target='_blank' rel='noreferrer' className='block'>{site.url}</a>)
				}
			</div>
		</div>		
    )
}

export default UniversityDetails