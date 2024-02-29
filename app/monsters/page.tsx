import EntityTable from '@/app/ui/monsters/entity-table';
import 
{ 
  Container, 
  Flex, 
  Text 
} from '@mantine/core';
import { AddButton } from '@/app/ui/buttons';
import { fetchMonsters } from '@/app/lib/data';
import 
{ 
  ActionNamesByMonsterId, 
  LocationNamesByMonsterId 
} from '@/app/lib/format';

// Page displayed when visiting /monsters
export default async function Page()
{ 
  // Get all monsters from database
  const monsters = await fetchMonsters();

  // Get 1:M  and M:M info for each monster to display in the table view
  const monsterRows = await Promise.all(monsters.map(async (monster) => 
  {
    return {
      monster_id: monster.monster_id ?? 0,
      monster_name: monster.monster_name,
      armor_class: monster.armor_class,
      hit_points: monster.hit_points,
      monster_type: monster.monster_type,
      monster_actions: await ActionNamesByMonsterId(monster.monster_id ?? 0),
      monster_locations: await LocationNamesByMonsterId(monster.monster_id ?? 0)
    }
  }));

  return (
    <Container
      size='md'
      px='lg'
    >
      <Flex
        direction='column'
        gap='lg'
        my='lg'
      >
        <Container
        >
          <Text
            size='xl'
            c='teal'
          >
            Monsters
          </Text>
        </Container>
        <EntityTable
          monsters={monsterRows}
        />
        <AddButton 
          pageRoot='monsters'
        />
      </Flex>
    </Container>
  );
}