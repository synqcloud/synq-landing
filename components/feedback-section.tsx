"use client";

import { motion } from "framer-motion";
import { MessageSquare, Bug, Lightbulb, Users } from "lucide-react";
import { Button } from "@synq/ui/component";

export function FeedbackSection() {
  const feedbackTypes = [
    {
      icon: Lightbulb,
      title: "Feature Requests",
      description: "Share your ideas for new features and improvements",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: Bug,
      title: "Report Issues",
      description: "Help us improve by reporting bugs and problems",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-500/10",
    },
    {
      icon: MessageSquare,
      title: "General Feedback",
      description: "Tell us what you think about Synq",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Users,
      title: "Community Discussions",
      description: "Connect with other card shop owners",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <section id="feedback" className="py-24 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6 border-t border-border pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">
            Help Shape Synq
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-foreground mb-4 max-w-2xl mx-auto">
            Your feedback drives our roadmap
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're building Synq with input from real card shop owners. Share
            your ideas, report issues, or join the discussion with other
            sellers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {feedbackTypes.map((type, idx) => (
            <div
              key={type.title}
              className={`p-5 bg-background rounded-lg border border-border hover:border-primary/30 transition-colors ${type.bgColor}`}
            >
              <type.icon className={`w-6 h-6 mb-3 ${type.color}`} />
              <h3 className="text-sm font-medium text-foreground mb-1">
                {type.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {type.description}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg">
              <a
                href="https://hintboard.app/synq"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the Discussion
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="https://hintboard.app/synq"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Roadmap
              </a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Powered by{" "}
            <a
              href="https://hintboard.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Hintboard
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
