import { useState, useEffect } from "react";
import styled from "styled-components";
import MasonryLayout from "components/MasonryLayout";

const GenerationsContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem 0;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  width: 100%;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #111 0%, #445069 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageSubtitle = styled.p`
  font-size: 1.6rem;
  color: #666;
  opacity: 0.8;
`;

const StatsSection = styled.div`
  display: flex;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(
    135deg,
    rgba(68, 80, 105, 0.05) 0%,
    rgba(17, 17, 17, 0.05) 100%
  );
  border-radius: 1rem;
  border: 0.1rem solid rgba(68, 80, 105, 0.1);
`;

const StatNumber = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  color: #445069;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.3rem;
  color: #666;
  font-weight: 500;
`;

const ErrorMessage = styled.div`
  padding: 2rem;
  background: rgba(255, 71, 87, 0.1);
  border: 0.1rem solid #ff4757;
  border-radius: 1rem;
  color: #ff4757;
  font-size: 1.6rem;
  text-align: center;
  max-width: 50rem;
  width: 100%;
  margin: 2rem 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
`;

const EmptyStateIcon = styled.div`
  font-size: 6rem;
  margin-bottom: 2rem;
  opacity: 0.3;
`;

const EmptyStateTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #445069;
`;

const EmptyStateText = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  max-width: 40rem;
  margin: 0 auto;
`;

const RefreshButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #111 0%, #445069 100%);
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Sen", sans-serif;
  margin-top: 2rem;

  &:hover {
    transform: translateY(-0.1rem);
    box-shadow: 0 0.4rem 1rem rgba(68, 80, 105, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Generations = () => {
  const [generations, setGenerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGenerations = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://fastapi-app-production-6492.up.railway.app/api/v1/generations"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.generations) {
        setGenerations(data.generations);
      } else {
        throw new Error("Failed to fetch generations");
      }
    } catch (error) {
      console.error("Error fetching generations:", error);
      setError(
        error.message || "Failed to load generations. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenerations();
  }, []);

  const handleImageView = (item) => {
    // Could implement a lightbox or modal here
    window.open(item.output_url, "_blank");
  };

  const handleImageDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `generation-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const getTimeStats = () => {
    if (!generations.length) return { today: 0, thisWeek: 0, total: 0 };

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todayCount = generations.filter(
      (gen) => new Date(gen.created_at) >= today
    ).length;

    const weekCount = generations.filter(
      (gen) => new Date(gen.created_at) >= weekAgo
    ).length;

    return {
      today: todayCount,
      thisWeek: weekCount,
      total: generations.length,
    };
  };

  const stats = getTimeStats();

  return (
    <GenerationsContainer>
      <PageHeader>
        <PageTitle>Your Generations</PageTitle>
        <PageSubtitle>
          View and manage all your AI-generated images
        </PageSubtitle>
      </PageHeader>

      {!loading && !error && generations.length > 0 && (
        <StatsSection>
          <StatItem>
            <StatNumber>{stats.today}</StatNumber>
            <StatLabel>Today</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{stats.thisWeek}</StatNumber>
            <StatLabel>This Week</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>{stats.total}</StatNumber>
            <StatLabel>Total</StatLabel>
          </StatItem>
        </StatsSection>
      )}

      {error && (
        <ErrorMessage>
          {error}
          <RefreshButton onClick={fetchGenerations} disabled={loading}>
            {loading ? "Loading..." : "Try Again"}
          </RefreshButton>
        </ErrorMessage>
      )}

      {!loading && !error && generations.length === 0 && (
        <EmptyState>
          <EmptyStateIcon>🎨</EmptyStateIcon>
          <EmptyStateTitle>No Generations Yet</EmptyStateTitle>
          <EmptyStateText>
            Start creating amazing AI-generated images! Visit the home page to
            select a template and begin your creative journey.
          </EmptyStateText>
        </EmptyState>
      )}

      <MasonryLayout
        items={generations}
        loading={loading}
        onView={handleImageView}
        onDownload={handleImageDownload}
        loadingCount={8}
      />
    </GenerationsContainer>
  );
};

export default Generations;
