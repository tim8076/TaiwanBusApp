import bannerImage from '../assets/images/banner.jpg'
import CardArea from '../components/CardArea'
export default function Home() {
  const places = [
    {
      path: '/',
      title: '台北市 / 新北市',
      subtitle: 'Taipei / New Taipei',
      color: 'text-primary-500',
    },
    {
      path: '/',
      title: '桃園市',
      subtitle: 'Taoyuan',
      color: 'text-primary-400',
    },
    {
      path: '/',
      title: '台中市',
      subtitle: 'Taichung',
      color: 'text-secondary',
    },
    {
      path: '/',
      title: '台南市',
      subtitle: 'Tainan',
      color: 'text-primary-100',
    },
    {
      path: '/',
      title: '高雄市',
      subtitle: 'Kaohsiung',
      color: 'text-primary-200',
    },
    {
      path: '/',
      title: '其他地區',
      subtitle: 'Other City',
      color: 'text-primary-300',
    },
  ];
  return (
    <div className='h-min-body d-flex flex-column'>
      <div className="home__banner"
        style={{
          backgroundImage: `url(${bannerImage})`
        }}>
        <div className="h-100 container d-flex align-items-center text-light">
          <h1 className='vertical-text home__title'>
            <span className='vertical-text fs-6 fs-lg-4 fw-light'>taiwan bus+</span><br />
            台灣公車動態<br />
            <span className='pt-8'>時刻查詢系統</span>
          </h1>
        </div>
      </div>
      <div className="bg-gray-100 py-5 home__links flex-grow-1 d-flex align-items-center">
        <div className="container h-100">
          <div className="row g-5">
            { places.map(place => {
              return (
                <div className="col-6 col-lg-2"
                  key={place.title}>
                  <CardArea place={place}/>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
