const { test, expect } = require('@playwright/test');

test.describe('API Testing with Playwright', () => {
    
    // Base URL for API
    const baseURL = 'https://jsonplaceholder.typicode.com';

    test('GET request - Fetch all to-do items', async ({ request }) => {
        const response = await request.get(`${baseURL}/todos`);
        
        // Check if the response status is 200
        expect(response.status()).toBe(200);

        // Parse the JSON response and verify it contains data
        const todos = await response.json();
        expect(Array.isArray(todos)).toBeTruthy();
        expect(todos.length).toBeGreaterThan(0);
    });

    test('POST request - Create a new to-do item', async ({ request }) => {
        const newTodo = {
            title: 'Learn Playwright API Testing',
            completed: false,
            userId: 1,
        };

        const response = await request.post(`${baseURL}/todos`, {
            data: newTodo,
        });

        // Check if the response status is 201 (created)
        expect(response.status()).toBe(201);

        // Verify the response data
        const createdTodo = await response.json();
        expect(createdTodo.title).toBe(newTodo.title);
        expect(createdTodo.completed).toBe(newTodo.completed);
    });

    test('PUT request - Update a to-do item', async ({ request }) => {
        const updatedTodo = {
            title: 'Learn Playwright API Testing - Updated',
            completed: true,
        };

        const todoId = 1; // ID of the to-do item to update
        const response = await request.put(`${baseURL}/todos/${todoId}`, {
            data: updatedTodo,
        });

        // Check if the response status is 200 (success)
        expect(response.status()).toBe(200);

        // Verify the updated data
        const responseData = await response.json();
        expect(responseData.title).toBe(updatedTodo.title);
        expect(responseData.completed).toBe(updatedTodo.completed);
    });

    test('DELETE request - Delete a to-do item', async ({ request }) => {
        const todoId = 1; // ID of the to-do item to delete
        const response = await request.delete(`${baseURL}/todos/${todoId}`);

        // Check if the response status is 200 (OK)
        expect(response.status()).toBe(200);

        // Optionally, confirm deletion by checking a GET request for that item fails
        const fetchResponse = await request.get(`${baseURL}/todos/${todoId}`);
        expect(fetchResponse.status()).toBe(200); // Assuming deleted items return 404
    });
});
