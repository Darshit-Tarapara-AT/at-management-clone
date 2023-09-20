import { Error404 } from './components/Error404'
import bg from 'app/assets/image/bg1.jpg';
const ErrorsLayout = () => {

    return (
        <div className='d-flex flex-column flex-root' style={{background: `url(${bg})`, backgroundSize: "cover", height: "100vh"}}>
            <div className='d-flex flex-column flex-center flex-column-fluid'>
                <div className='d-flex flex-column flex-center text-center p-10'>
                    <div className='card card-flush  w-lg-650px py-5'>
                        <div className='card-body py-15 py-lg-20'>
                            <Error404 />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ErrorsLayout }
