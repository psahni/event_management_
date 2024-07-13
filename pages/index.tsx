import establishConnection from "config/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import Events from  "components/events"

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  let isConnected: boolean;
  try {
    await establishConnection()
    isConnected = true
    return {
      props: { isConnected  },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container">
      <main>
        {isConnected ? (
          <div>
          <h2 className="subtitle">Event Management</h2>
          <h5>Displaying Events</h5>
          <Events></Events>
          </div>
        ) : (
          <h2 className="subtitle">
            Something went wrong 
          </h2>
        )}

      </main>

      <footer>
      </footer>

      <style jsx>{`
        .container {
          padding: 1rem;
        }
      `}
      </style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
