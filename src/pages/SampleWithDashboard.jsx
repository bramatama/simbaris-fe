import Button from '../components/Button';
const SampleWithDashboard = (isSidebarOpen) => {
    return (
        <div className="bg-gray-100 min-h-screen flex">
            <div className="pl-64 pt-[100px] flex items-center justify-center">
                <Button
                    text="Login"
                    size="long"
                    round="half"
                    color="accent"
                ></Button>
            </div>
        </div>
    );
};
export default SampleWithDashboard;
