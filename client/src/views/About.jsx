import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const About = () => {
    return (
        <Row className='mt-5 w-[600px] mx-auto' style={{marginRight: 0}}>
            <Col>
                <h1 className='text-[#609b8a] text-[30px] font-bold'>Hi...!!!</h1>
                <br/>
                <p>
                    EduTracker is an educational tracking application designed to help users manage their learning
                    journey effectively. Whether you're a student, professional, or lifelong learner, EduTracker offers
                    a streamlined platform to track your educational goals, monitor your progress, and stay organized
                    throughout your learning process
                    <br/>
                    <br/>
                    With EduTracker, you can create and manage a personalized list of skills, subjects, or topics that
                    you want to learn or improve upon. The application provides an intuitive interface where you can add
                    new items to your learning list, including a title, description, and optional YouTube tutorial URL.
                    <br/>
                    <br/>
                    Once you've added an item to your list, you can track your progress by updating its status.
                    EduTracker offers three status levels: "TO LEARN," "LEARNING," and "LEARNED." You can easily update
                    the status of each item based on your progress, giving you a clear overview of your learning
                    journey.
                </p>
            </Col>
        </Row>

    );
};

export default About;