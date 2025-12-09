import Banner from './Banner';
import DailyMeals from './DailyMeals';
import WhyChooseUs from './WhyChooseUs';
import Review from './Review/Reviews';

const dailyMealsPromise = fetch('http://localhost:3000/dailymeals').then(res=>res.json())
// const reviewsPromise = fetch('http://localhost:3000/reviews').then(res=>res.json())

const Home = () => {
    return (
        <div>
            <Banner/>
            <DailyMeals dailyMealsPromise={dailyMealsPromise}/>
            <WhyChooseUs/>
        </div>
    );
};

export default Home;