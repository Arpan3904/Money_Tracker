package org.example.moneymanager.controller;// ExpenseController.java

import org.example.moneymanager.entity.Expense;
import org.example.moneymanager.entity.Group;
import org.example.moneymanager.entity.User;
import org.example.moneymanager.repository.UserRepository;
import org.example.moneymanager.service.ExpenseService;
import org.example.moneymanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/expenses")
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense) {
        Expense savedExpense = expenseService.saveExpense(expense);
        return ResponseEntity.status(201).body(savedExpense);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/ownamt/{uname}")
    public User ownUser(@PathVariable String uname, @RequestBody User request) {
        User user1 = userService.findByUsername(uname);
        if (user1 == null) {
            throw new RuntimeException("User not found with username: " + uname);
        }
        System.out.println("aaa"+uname);
        System.out.println(request.getOwnAmount());
        System.out.println(user1.getOwnAmount());
        user1.setOwnAmount(user1.getOwnAmount()+request.getOwnAmount());
        return userRepository.save(user1);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/oweamt/{uname}")
    public User oweUser(@PathVariable String uname, @RequestBody Map<String, Integer> amounts) {
        System.out.println(amounts.entrySet());
        User user1 = userService.findByUsername(uname);
        if (user1 == null) {
            throw new RuntimeException("User not found with username: " + uname);
        }

        for (Map.Entry<String, Integer> entry : amounts.entrySet()) {
            String username = entry.getKey();
            Integer amount = entry.getValue();
            System.out.println("username : "+username+" amount : "+amount);

            // Find the user by username
            User userToUpdate = userService.findByUsername(username);
            if (userToUpdate != null) {
                // Update the oweAmount for the user
                userToUpdate.setOweAmount(userToUpdate.getOweAmount() + amount);
                userRepository.save(userToUpdate);
            }
        }

        return user1;
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{groupId}/expenses")
    public ResponseEntity<List<Expense>> getExpensesByGroupId(@PathVariable Long groupId) {
        List<Expense> expenses = expenseService.getExpensesByGroupId(groupId);
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }
}
