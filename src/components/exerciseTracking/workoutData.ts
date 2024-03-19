

    const workoutData = [
      {
        name: 'Full Body Strength',
        exercises: [
          {
            exerciseName: 'Push-up',
            difficulty: 'beginner',
            type: 'strength',
            sets: '3',
            duration_reps: '15 reps',
            muscle: 'chest, shoulders, triceps',
            equipment: 'none',
            description: 'Start in a plank position with your hands slightly wider than shoulder-width apart. Lower your body until your chest nearly touches the floor, then push yourself back up to the starting position.'
          },
          {
            exerciseName: 'Squat',
            difficulty: 'intermediate',
            type: 'strength',
            sets: '4',
            duration_reps: '10 reps',
            muscle: 'quadriceps, hamstrings, glutes',
            equipment: 'none',
            description: "Stand with your feet shoulder-width apart, toes pointing slightly outward. Lower your body as if you're sitting back into a chair, keeping your chest up and knees behind your toes. Push through your heels to return to the starting position."
          },
          {
            exerciseName: 'Deadlift',
            difficulty: 'expert',
            type: 'strength',
            sets: '5',
            duration_reps: '5 reps',
            muscle: 'hamstrings, glutes, lower back',
            equipment: 'barbell',
            description: 'Stand with your feet hip-width apart, toes under the barbell. Hinge at the hips and grip the bar with hands shoulder-width apart. Keep your back flat, chest up, and core engaged as you lift the bar by straightening your hips and knees. Lower the bar back down with control.'
          }
        ]
      },
      {
        name: 'Core and Cardio Blast',
        exercises: [
          {
            exerciseName: 'Plank',
            difficulty: 'beginner',
            type: 'core',
            sets: '3',
            duration_reps: '30 seconds',
            muscle: 'core',
            equipment: 'none',
            description: 'Start in a push-up position with your hands directly under your shoulders. Engage your core and hold your body in a straight line from head to heels.'
          },
          {
            exerciseName: 'Burpees',
            difficulty: 'intermediate',
            type: 'cardio',
            sets: '4',
            duration_reps: '12 reps',
            muscle: 'full body',
            equipment: 'none',
            description: 'Start in a standing position, squat down and place your hands on the floor. Kick your feet back into a plank position, perform a push-up, then jump your feet back to the squat position and jump up explosively.'
          }
        ]
      },
      // Add more workouts as needed
    ];
    
  export default workoutData;
