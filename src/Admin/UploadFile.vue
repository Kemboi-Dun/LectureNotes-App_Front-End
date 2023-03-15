<template>
    <div class="upload_container">
        <div class="upload_wrapper">
            <form action="POST">
                <!-- FILE NAME -->
                <label for="Name">File Name</label>
                <input type="text" required>
                <!-- YEAR -->
                <!-- <label for="year">Year</label>
                <input type="date" required> -->
                <!-- CourseType -->
                <label for="courseType">Course Type</label>
                <select name="courseType" required>
                    <option value="Certificate">Certificate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Degree">Degree</option>
                </select>
                <!-- CourseName -->
                <!-- <label for="courseName">Course Name</label>
                <select name="courseName" required>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Education">Education</option>
                    <option value="Bussiness">Bussiness</option>
                </select> -->
                <!-- Semester -->
                <label for="semester">Semester</label>
                <select name="semester" required>
                    <option value="1.1">1.1</option>
                    <option value="1.2">1.2</option>
                    <option value="2.1">2.1</option>
                    <option value="2.2">2.2</option>
                    <option value="3.1">3.1</option>
                    <option value="3.2">3.2</option>
                    <option value="3.3">3.3</option>
                    <option value="4.1">4.1</option>
                    <option value="4.2">4.2</option>
                </select>
                <!-- UnitName -->
                <label for="unitName">Unit Name</label>
                <input type="text" required >
                <!-- UnitCode -->
                <label for="unitCode">Unit Code</label>
                <input type="text" placeholder="BSCS,GUCC..." required>
                <!-- Type -->
                <label for="type">Type</label>
                <input type="text" placeholder="Notes,Article,PastPaper.." required>
            </form>
        </div>
    </div>
</template>