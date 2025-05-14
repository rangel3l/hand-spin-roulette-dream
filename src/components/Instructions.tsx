
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Instructions = () => {
  return (
    <Card className="bg-green-700 border-yellow-400 border-2">
      <CardHeader>
        <CardTitle className="text-yellow-400">How to Play</CardTitle>
      </CardHeader>
      <CardContent className="text-white">
        <ul className="list-disc list-inside space-y-2">
          <li>Move your hand left or right in front of the camera</li>
          <li>The wheel will spin according to your hand's direction and speed</li>
          <li>Numbers 0, 10, 20, 30, 40 are "Again!" - spin one more time</li>
          <li>The faster your hand moves, the faster the wheel spins</li>
        </ul>
      </CardContent>
    </Card>
  );
};
