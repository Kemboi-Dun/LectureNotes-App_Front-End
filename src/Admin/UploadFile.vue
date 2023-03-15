<template>
    <div class="upload_container">
        <div class="upload_wrapper">
            <form action="POST">
                <!-- FILE NAME -->
                <label for="Name">File Name</label>
                <input type="text" placeholder="Enter file name.." required>
                <!-- YEAR -->
                <label for="year">Year</label>
                <input type="date" required>
                <!-- CourseType -->
                <label for="courseType">Course Type</label>
                <!-- CourseName -->
                <label for="courseName">Course Name</label>
                <!-- Semester -->
                <label for="semester">Semester</label>
                <!-- UnitName -->
                <label for="unitName">Unit Name</label>
                <!-- UnitCode -->
                <label for="unitCode">Unit Code</label>
                <!-- Type -->
                <label for="type">Type</label>
            </form>
        </div>
    </div>
</template>