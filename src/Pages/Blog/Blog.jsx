import { Box, Paper, Typography } from "@mui/material"
import PageTitle from "../../Utils/PageTitle/PageTitle";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import bgImg from '../../assets/image/medicalBanner.jpg'

const Blog = () => {
    return (
        <Box component={Paper} sx={{
            backgroundImage : `url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <PageTitle title='Blog'></PageTitle>
            <SectionTitle title='Blog'></SectionTitle>
            <Box sx={{my: 4, mx: 'auto', maxWidth: '70%', p: 3}}>
                <Typography>
                    <strong style={{color: 'blue'}}>1. The Importance of Regular Health Check-ups:</strong> Discuss the significance of routine health screenings and check-ups in maintaining overall well-being. Highlight different age groups and the recommended frequency of tests.
                </Typography>
                <Typography sx={{mt: 2}}>
                    <strong style={{color: 'blue'}}>2. Understanding Diagnostic Tests:</strong> A Guide for Patients: Explain common diagnostic tests conducted at the center, their purposes, procedures, and what patients can expect during and after these tests.
                </Typography>
                <Typography sx={{mt: 2}}>
                    <strong style={{color: 'blue'}}>3. Preventive Health Measures for a Healthy Lifestyle: </strong> Offer tips and guidance on how to prevent common health issues through lifestyle changes, including diet, exercise, stress management, and regular check-ups.
                </Typography>
                <Typography sx={{mt: 2}}>
                    <strong style={{color: 'blue'}}>4. Spotlight on Advanced Diagnostic Technologies:  </strong>  Detail the cutting-edge diagnostic tools and technologies used at FM Diagnostic Center, explaining their benefits and how they aid accurate diagnoses.
                </Typography>
                <Typography sx={{mt: 2}}>
                    <strong style={{color: 'blue'}}>5. Managing Chronic Conditions: Support and Resources: </strong> Provide information and resources for individuals managing chronic diseases, discussing available diagnostic methods and ongoing support at your center.
                </Typography>
                <Typography sx={{mt: 2}}>
                    <strong style={{color: 'blue'}}>6. Women's Health: Importance of Specialized Diagnostics: </strong> Focus on specialized diagnostic services for women's health issues, such as breast cancer screenings, prenatal tests, and gynecological exams.
                </Typography>
                <Typography sx={{mt: 2}}>
                    <strong style={{color: 'blue'}}>7. Men's Health Check-ups: Breaking the Stigma: </strong> Address the importance of men's health check-ups, breaking stereotypes and emphasizing the significance of early detection in preventing health problems.
                </Typography>
                <Typography sx={{mt: 2}}>
                    <strong style={{color: 'blue'}}>8. Community Health: Promoting Health Awareness and Screenings: </strong> Discuss the center's community outreach programs, health camps, and initiatives aimed at spreading health awareness and providing free screenings.
                </Typography>
                <Typography sx={{mt: 2}}>
                    <strong style={{color: 'blue'}}>9. Tips for Navigating Diagnostic Tests: Patient's Guide:  </strong> Provide a comprehensive guide for patients on preparing for diagnostic tests, including fasting requirements, medication adjustments, and other necessary preparations.
                </Typography>
            </Box>
        </Box>
    );
};

export default Blog;