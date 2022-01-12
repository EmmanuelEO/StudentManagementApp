package com.example.StudentManagementApp.student;

import com.example.StudentManagementApp.student.exception.BadRequestException;
import com.example.StudentManagementApp.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepo studentRepo;

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public void addStudent(Student student) {
        Boolean existsEmail = studentRepo.existsEmail(student.getEmail());
        if (existsEmail) {
            throw new BadRequestException("The email " + student.getEmail() +
                    " has already been taken by another student");
        }
        studentRepo.save(student);
    }

    public void deleteStudent(Long studentID) {
        Boolean existsByID = studentRepo.existsById(studentID);
        if (!existsByID) {
            throw new StudentNotFoundException("The student with ID " + studentID + " that you want to delete does not exist.");
        }
        studentRepo.deleteById(studentID);
    }
}
