import YearCount from '@/models/year_count';

export async function generateIndexNumber(birthYear: number): Promise<string> {
  try {
    // Find or create year count
    let yearCount = await YearCount.findOne({ year: birthYear });
    
    if (!yearCount) {
      yearCount = await YearCount.create({
        year: birthYear,
        count: 0
      });
    }
    
    // Increment count
    yearCount.count += 1;
    await yearCount.save();
    
    // Format index number: YYYYV#### (e.g., 2000V0001)
    const paddedCount = yearCount.count.toString().padStart(4, '0');
    return `${birthYear}V${paddedCount}`;
    
  } catch (error) {
    console.error('Error generating index number:', error);
    throw error;
  }
}