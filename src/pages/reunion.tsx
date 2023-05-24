"use client";

import { useMeetingStore } from "@/stores/meeting";
import router from "next/router";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { useState, useEffect, useSyncExternalStore } from "react";

interface User {
  number: number;
  id: string;
  displayName: string;
}

function useWindowDimensions() {
  // the 3rd parameter is optional and only needed for server side rendering
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribe(callback: any) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getSnapshot() {
  return { width: window.innerWidth, height: window.innerHeight };
}

function getServerSnapshot() {
  return {
    width: 0,
    height: 0,
  };
}

export default function Page() {
  const [windowDimensions, setWindowDimensions] = useState(getSnapshot());
  const [users, setUsers] = useState<User[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  const { meeting, nombre, isSecretario } = useMeetingStore((state: any) => ({
    meeting: state.meeting,
    nombre: state.nombre,
    isSecretario: state.isSecretario,
  }));

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full min-h-screen">
        <JitsiMeeting
          roomName={"CDMX_Migala"}
          getIFrameRef={(node) => {
            if (node) {
              node.style.height = `${windowDimensions.height - 20}px`;
              node.style.width = `${windowDimensions.width - 20}px`;
            }
          }}
          onApiReady={(api) => {
            api.executeCommand("displayName", nombre);

            api.addListener("participantJoined", (data: any) => {
              // We check if the user is the secretary
              setUsers([
                ...users,
                {
                  number: users.length + 1,
                  id: data.id,
                  displayName: data.displayName,
                },
              ]);
            });
          }}
        />
      </div>
      <div className="flex flex-col w-full min-h-screen px-16">
        <table className="table-fixed text-center">
          <thead className="bg-gray-100 text-gray-400">
            <tr className="text-center">
              <th className="py-2">No.</th>
              <th className="py-2">Participante</th>
              <th className="py-2">Id</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                className="border-b-2 border-gray-100 text-gray-400"
                key={user.id}
              >
                <td className="py-2">{user.number}</td>
                <td className="py-2">{user.displayName}</td>
                <td className="py-2">{user.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
