import { cutLongString } from '../../../common/helpers/cutLongString';
import { TypeTrainingDay } from '../../../context/trainingProgram/types';

export const createMuscleGroupsDescription = (day: TypeTrainingDay): string => {
  const dayMuscleGroups: string[] = [];
  for (const exercise of day.exercises) {
    const exerciseMuscleGroups = exercise.muscleGroups.split(', ');

    exerciseMuscleGroups.forEach((muscleGroup) => {
      if (!dayMuscleGroups.includes(muscleGroup)) {
        dayMuscleGroups.push(muscleGroup);
      }
    });
  }
  return cutLongString(dayMuscleGroups.join(', '), 40);
};
